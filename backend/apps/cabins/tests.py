import json

from django.core import mail

from apps.cabins.models import Booking, BookingResponsible
from apps.cabins.models import BookingSemester
from apps.cabins.helpers import snake_case_to_camel_case
from utils.testing.base import ExtendedGraphQLTestCase
from utils.testing.cabins_factories import BookingFactory
import datetime

from django.utils import timezone
from utils.testing.factories.cabins import CabinFactory

from utils.testing.factories.users import UserFactory
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType


class CabinsBaseTestCase(ExtendedGraphQLTestCase):
    def setUp(self) -> None:
        super().setUp()
        # Create three bookings
        self.now = timezone.now()
        self.bjornen_cabin = CabinFactory(name="Bjørnen")
        self.oksen_cabin = CabinFactory(name="Oksen")
        self.first_booking = BookingFactory(
            check_in=self.now,
            check_out=self.now + datetime.timedelta(days=4),
            cabins=[self.bjornen_cabin],
            internal_participants=4,
            external_participants=1,
        )
        self.second_booking = BookingFactory(
            check_in=self.now + datetime.timedelta(days=6),
            check_out=self.now + datetime.timedelta(days=12),
            cabins=[self.oksen_cabin, self.bjornen_cabin],
            internal_participants=3,
            external_participants=4,
        )
        self.third_booking = BookingFactory(
            check_in=self.now + datetime.timedelta(days=24),
            check_out=self.now + datetime.timedelta(days=30),
            cabins=[self.oksen_cabin],
            internal_participants=4,
            external_participants=3,
        )
        self.no_conflict_booking = BookingFactory.build(
            check_in=self.now + datetime.timedelta(days=50),
            check_out=self.now + datetime.timedelta(days=52),
            internal_participants=4,
            external_participants=2,
        )

        # Create two (logged in) users
        self.user = UserFactory()
        self.super_user = UserFactory(is_staff=True, is_superuser=True)

        # Create default booking responsible
        self.booking_responsible = BookingResponsible(
            first_name="Ellie", last_name="Berglund", phone="94258380", email="booking@indokhyttene.no", active=True
        )
        self.booking_responsible.save()

        self.date_fmt = "%Y-%m-%d"
        self.booking_semester_dict = {
            "fall_start_date": f"{self.now.strftime(self.date_fmt)}",
            "fall_end_date": f"{(self.now + datetime.timedelta(weeks=12)).strftime(self.date_fmt)}",
            "spring_start_date": f"{(self.now + datetime.timedelta(weeks=16)).strftime(self.date_fmt)}",
            "spring_end_date": f"{(self.now + datetime.timedelta(weeks=28)).strftime(self.date_fmt)}",
            "fall_semester_active": True,
            "spring_semester_active": False,
        }

        self.booking_semester = BookingSemester(**self.booking_semester_dict)
        self.booking_semester.save()

    def add_booking_permission(self, codename):
        content_type = ContentType.objects.get_for_model(Booking)
        self.user.user_permissions.add(Permission.objects.get(codename=codename, content_type=content_type))

    def create_booking(self, booking, cabins_field, user=None):

        query = f"""
                mutation CreateBooking {{
                    createBooking(
                        bookingData: {{
                            firstName: \"{booking.first_name}\",
                            lastName: \"{booking.last_name}\",
                            phone: \"{booking.phone}\",
                            receiverEmail: \"{booking.receiver_email}\",
                            checkIn: \"{booking.check_in.strftime(self.date_fmt)}\",
                            checkOut: \"{booking.check_out.strftime(self.date_fmt)}\",
                            internalParticipants: {booking.internal_participants},
                            externalParticipants: {booking.external_participants},
                            cabins: [{cabins_field}],
                            }}
                        ) {{
                      ok
                        }}
                    }}
                """
        return self.query(query, user=user)


class CabinsResolversTestCase(CabinsBaseTestCase):
    """
    Testing all resolvers for cabins
    """

    def test_resolve_all_bookings(self):
        response = self.query(
            """
            query {
                allBookings {
                    id
                    checkIn
                    checkOut
                    cabins {
                        id
                        name
                    }
                }
            }
            """,
        )
        # This validates the status code and if you get errors
        self.assertResponseNoErrors(response)
        # Fetching content of response
        content = json.loads(response.content)

        # There are three bookings in the database
        self.assertEqual(len(content["data"]["allBookings"]), 3)

    def test_resolve_admin_all_bookings(self):
        query = """
            query {
                adminAllBookings {
                    id
                    checkIn
                    checkOut
                    cabins {
                        id
                        name
                    }
                    firstName
                    lastName
                }
            }
            """
        # Try to make query without permission
        response = self.query(query, user=self.user)
        # This validates the status code and if you get errors
        self.assert_permission_error(response)

        # Try to make query with permission
        self.add_booking_permission("manage_booking")
        response = self.query(query, user=self.user)
        self.assertResponseNoErrors(response)
        # Fetching content of response
        content = json.loads(response.content)

        # There are three bookings in the database
        self.assertEqual(len(content["data"]["adminAllBookings"]), 3)

    def test_resolve_cabins(self):
        response = self.query(
            """
            query AllCabins {
                cabins {
                  id
                  name
                  maxGuests
                  internalPrice
                  externalPrice
                }
              }
            """,
        )
        # This validates the status code and if you get errors

        self.assertResponseNoErrors(response)
        # Fetching content of response
        content = json.loads(response.content)

        # There are two cabins in the database
        self.assertEqual(len(content["data"]["cabins"]), 2)


class CabinsMutationsTestCase(CabinsBaseTestCase):
    """
    Testing all mutations for cabins
    """

    def check_create_with_error(self, response):
        self.assertResponseHasErrors(response)
        # Check that booking is not created
        self.assertEqual(3, len(Booking.objects.all()))

    def test_create_booking(self):
        response = self.create_booking(self.no_conflict_booking, f"{self.bjornen_cabin.id}", user=self.user)
        self.assertResponseNoErrors(response)
        # Check that booking is created
        self.assertTrue(
            Booking.objects.filter(
                first_name=self.no_conflict_booking.first_name,
                phone=self.no_conflict_booking.phone,
            ).exists()
        )

    def test_add_invalid_booking(self):
        # Try to add booking before current time
        self.first_booking.check_in = timezone.now() - datetime.timedelta(days=10)
        self.first_booking.check_in = timezone.now() - datetime.timedelta(days=5)
        response = self.create_booking(self.first_booking, f"{self.bjornen_cabin.id}")
        self.check_create_with_error(response)

        # Try to add booking where checkin is after checkout
        self.first_booking.check_in = timezone.now() + datetime.timedelta(days=10)
        self.first_booking.check_in = timezone.now()
        response = self.create_booking(self.first_booking, f"{self.bjornen_cabin.id}")
        self.check_create_with_error(response)

        # Try to add booking within the same time as another booking
        response = self.create_booking(self.third_booking, f"{self.oksen_cabin.id}")
        # This validates the status code and if you get errors
        self.check_create_with_error(response)

    def test_invalid_email(self):
        self.no_conflict_booking.receiver_email = "oda.norwegian123.no"
        response = self.create_booking(self.no_conflict_booking, f"{self.oksen_cabin.id}")
        self.check_create_with_error(response)

    def test_empty_first_name(self):
        # Try to add a booking with no first name variable
        self.no_conflict_booking.first_name = ""
        response = self.create_booking(self.no_conflict_booking, f"{self.oksen_cabin.id}")
        self.check_create_with_error(response)

    def test_empty_last_name(self):
        # Try to add a booking with no last name variable
        self.no_conflict_booking.last_name = ""
        response = self.create_booking(self.no_conflict_booking, f"{self.oksen_cabin.id}")
        self.check_create_with_error(response)

    def test_phone_number(self):
        # Try to make cabin with invalid phone number
        self.no_conflict_booking.phone = "26832732"
        response = self.create_booking(self.no_conflict_booking, f"{self.oksen_cabin.id}")
        self.check_create_with_error(response)

    def test_sum_of_participants_cannot_exceed_limit(self):
        # Try to add a booking with more participants than total capacity of cabin
        self.no_conflict_booking.internal_participants = 15
        self.no_conflict_booking.external_participants = 7
        response = self.create_booking(self.no_conflict_booking, f"{self.oksen_cabin.id}")
        self.check_create_with_error(response)
        # Try to add a booking with more participants than total capacity of cabins
        self.no_conflict_booking.internal_participants = 19
        self.no_conflict_booking.external_participants = 21
        response = self.create_booking(self.no_conflict_booking, f"{self.oksen_cabin.id}, {self.bjornen_cabin.id}")
        self.check_create_with_error(response)

    def test_no_checkin_and_checkout_on_same_day(self):
        self.first_booking.check_in = timezone.now()
        self.first_booking.check_in = timezone.now()
        response = self.create_booking(self.first_booking, f"{self.bjornen_cabin.id}")
        self.check_create_with_error(response)

    def test_update_booking(self):
        query = f"""
        mutation {{
          updateBooking(bookingData: {{id: {self.first_booking.id}, firstName: \"Sverre\", lastName: \"Spetalen\"}}) {{
            ok
            booking {{
              id
            }}
          }}
        }}
        """
        # Change booking without permission
        response = self.query(query)
        self.assert_permission_error(response)

        # Change booking with change_booking permission
        self.add_booking_permission("manage_booking")
        response = self.query(query, user=self.user)

        # Fetch updated booking
        self.first_booking = Booking.objects.get(pk=self.first_booking.id)
        self.assertResponseNoErrors(response)
        self.assertEqual("Sverre", self.first_booking.first_name)
        self.assertEqual("Spetalen", self.first_booking.last_name)

    def test_delete_booking(self):
        query = f"""
                mutation {{
                  deleteBooking(id: {self.first_booking.id}) {{
                    ok
                    bookingId
                  }}
                }}
                """
        response = self.query(query)
        # Check that unauthorized user cannot delete booking
        self.assert_permission_error(response)
        try:
            Booking.objects.get(pk=self.first_booking.id)
        except Booking.DoesNotExist:
            self.assertTrue(True, "The booking was deleted after unauthorized user tried to delete")
        self.add_booking_permission("manage_booking")
        response = self.query(query, user=self.user)
        self.assertResponseNoErrors(response)
        with self.assertRaises(Booking.DoesNotExist):
            Booking.objects.get(pk=self.first_booking.id)

    def test_update_cabin(self):
        max_guests = 10

        query = f"""
              mutation UpdateCabin {{
                updateCabin(cabinData: {{
                    id: \"{self.oksen_cabin.id}\",
                    name: \"{self.oksen_cabin.name}\",
                    maxGuests: {max_guests},
                }}) {{
                    cabin {{
                        id
                        maxGuests
                    }}
                }}
            }}
        """

        # Check that unauthorized user cannot update cabin
        response = self.query(query)
        self.assert_permission_error(response)

        # Check that an authorized user can update cabins
        response = self.query(query, user=self.super_user)
        self.assertResponseNoErrors(response)

        # Check that updated data is correct
        content = json.loads(response.content)
        updated_cabin = content["data"]["updateCabin"]["cabin"]
        self.assertEquals(updated_cabin["maxGuests"], max_guests)


class EmailTestCase(CabinsBaseTestCase):
    def setUp(self) -> None:
        super().setUp()
        mail.outbox = []
        self.test_question = "This is a test question"

    def send_email(self, booking, email_type: str = "reserve_booking", user=None):
        query = f"""
            mutation {{
              sendEmail(
                emailInput: {{
                  firstName: \"{booking.first_name}\",
                  lastName: \"{booking.last_name}\",
                  receiverEmail: \"{booking.receiver_email}\",
                  phone: \"{booking.phone}\",
                  internalParticipants: {booking.internal_participants},
                  externalParticipants: {booking.external_participants},
                  cabins: [{self.oksen_cabin.id}],
                  checkIn: \"{booking.check_in.strftime(self.date_fmt)}\",
                  checkOut: \"{booking.check_out.strftime(self.date_fmt)}\",
                  emailType: \"{email_type}\",
                  extraInfo: \"{self.test_question}\",
                }}
              ){{
                ok
              }}
            }}
        """
        return self.query(query, user=user)

    def test_outbox_size_reservation(self):
        # Check outbox size when sending reservation mails to both admin and user
        response = self.send_email(self.first_booking, "reserve_booking", user=self.super_user)
        self.assertResponseNoErrors(resp=response)
        self.assertEqual(len(mail.outbox), 2)

    def test_outbox_size_decision(self):
        # Check outbox size when sending the decision (approve or disapprove) mail to the user
        response = self.send_email(self.first_booking, "approve_booking", user=self.super_user)
        self.assertResponseNoErrors(resp=response)
        self.assertEqual(len(mail.outbox), 1)

    def test_subject_reservation(self):
        response = self.send_email(self.first_booking, user=self.super_user)
        self.assertResponseNoErrors(resp=response)

        # Verify that the subject of the first message is correct.
        self.assertEqual(mail.outbox[0].subject, "Bekreftelse på mottat søknad om booking av Oksen")

    def test_subject_approval(self):
        response = self.send_email(self.first_booking, "approve_booking", user=self.super_user)
        self.assertResponseNoErrors(resp=response)

        # Verify that the subject of the first message is correct.
        self.assertTrue("Hyttestyret har tatt stilling til søknaden din om booking av " in mail.outbox[0].subject)

    def test_reservation_mail_content(self):
        response = self.send_email(self.first_booking, "reserve_booking", user=self.super_user)
        self.assertResponseNoErrors(resp=response)

        # Verify that the mails contain the price
        self.assertTrue(str(self.first_booking.price) in mail.outbox[0].body)
        self.assertTrue(str(self.first_booking.price) in mail.outbox[1].body)

        # Verify that the admin email contains the correct contact info
        self.assertTrue(self.first_booking.first_name in mail.outbox[1].body)
        self.assertTrue(self.first_booking.last_name in mail.outbox[1].body)
        self.assertTrue(self.first_booking.first_name in mail.outbox[1].body)
        self.assertTrue(str(self.first_booking.phone) in mail.outbox[1].body)
        self.assertTrue(f"Antall indøkere: {self.first_booking.internal_participants}" in mail.outbox[1].body)
        self.assertTrue(f"Antall eksterne: {self.first_booking.external_participants}" in mail.outbox[1].body)

        # Verify that the checkin and checkout for admin and user email is correct
        date_fmt = "%d-%m-%Y"
        self.assertTrue(self.first_booking.check_in.strftime(date_fmt) in mail.outbox[0].body)
        self.assertTrue(self.first_booking.check_out.strftime(date_fmt) in mail.outbox[0].body)
        self.assertTrue(self.first_booking.check_in.strftime(date_fmt) in mail.outbox[1].body)
        self.assertTrue(self.first_booking.check_out.strftime(date_fmt) in mail.outbox[1].body)

        # Verify that the email contains the correct question provided by the user
        self.assertTrue(self.test_question in mail.outbox[0].body)


class BookingSemesterTestCase(CabinsBaseTestCase):
    def setUp(self) -> None:
        super().setUp()

    def update_booking_semester(self, user=None):
        query = """
        mutation UpdateBookingSemester{
            updateBookingSemester(semesterData: {
                fallStartDate: "2021-09-01",
                fallEndDate: "2021-11-29",
                springStartDate: "2022-01-01",
                springEndDate: "2022-01-05",
                fallSemesterActive: false,
                springSemesterActive: true
            }) {
                bookingSemester {
                    fallStartDate
                    fallSemesterActive
                }
            }
        }"""
        # Default to super user
        if user is None:
            user = self.super_user

        return self.query(query, user=user)

    def test_resolve_booking_semester(self):
        query = """
        query BookingSemesters {
            bookingSemester {
                fallStartDate
                fallEndDate
                springStartDate
                springEndDate
                fallSemesterActive
                springSemesterActive
            }
        }
        """

        response = self.query(query)
        self.assertResponseNoErrors(response)

        # Fetching content of response
        content = json.loads(response.content)
        booking_semester = content["data"]["bookingSemester"]

        for key, value in self.booking_semester_dict.items():
            self.assertEquals(value, booking_semester[snake_case_to_camel_case(key)])

    # Verify that the booking is inside a booking semester
    def test_booking_inside_booking_semester(self):
        self.first_booking.check_in = datetime.datetime.strptime(
            self.booking_semester_dict["fall_start_date"], self.date_fmt
        ) + datetime.timedelta(days=1)
        self.first_booking.check_out = datetime.datetime.strptime(
            self.booking_semester_dict["fall_start_date"], self.date_fmt
        ) + datetime.timedelta(days=3)

        response = self.create_booking(self.first_booking, cabins_field=f"{self.oksen_cabin.id}", user=self.super_user)
        self.assertResponseNoErrors(response)

    # Verify that a booking outside of booking semester is invalid
    def test_booking_outside_booking_semester(self):
        self.first_booking.check_in = datetime.datetime.strptime(
            self.booking_semester_dict["spring_end_date"], self.date_fmt
        ) + datetime.timedelta(days=1)
        self.first_booking.check_out = datetime.datetime.strptime(
            self.booking_semester_dict["spring_end_date"], self.date_fmt
        ) + datetime.timedelta(days=3)

        response = self.create_booking(
            self.first_booking, cabins_field=f"{self.bjornen_cabin.id}", user=self.super_user
        )
        self.assertResponseHasErrors(response)

    # Verify that a booking inside an inactive booking semester is invalid
    def test_booking_in_inactive_booking_semester(self):
        self.first_booking.check_in = datetime.datetime.strptime(
            self.booking_semester_dict["spring_start_date"], self.date_fmt
        ) + datetime.timedelta(days=1)
        self.first_booking.check_out = datetime.datetime.strptime(
            self.booking_semester_dict["spring_start_date"], self.date_fmt
        ) + datetime.timedelta(days=3)

        response = self.create_booking(
            self.first_booking, cabins_field=f"{self.bjornen_cabin.id}", user=self.super_user
        )
        self.assertResponseHasErrors(response)

    def test_update_booking_semester(self):
        response = self.update_booking_semester()
        self.assertResponseNoErrors(response)

        # Fetching content of response
        content = json.loads(response.content)
        booking_semester = content["data"]["updateBookingSemester"]["bookingSemester"]

        self.assertEquals(booking_semester["fallStartDate"], "2021-09-01")
        self.assertEquals(booking_semester["fallSemesterActive"], False)

    # Verify that updating the booking semester creates a new booking semester if there are no booking
    # semesters in the database.
    def test_update_booking_semester_when_not_exists(self):
        # Delete booking semester in db
        BookingSemester.objects.all().delete()

        # Update non-existing booking semester
        response = self.update_booking_semester()
        self.assertResponseNoErrors(response)

        # Assert that a new booking semester has been created
        self.assertEquals(len(BookingSemester.objects.all()), 1)

    # Verify that a normal user cannot update a booking semester
    def test_update_booking_semester_without_permission(self):
        # Assert error when no permission
        response = self.update_booking_semester(user=self.user)
        self.assert_permission_error(response)

        # Add permission
        content_type = ContentType.objects.get_for_model(BookingSemester)
        permission = Permission.objects.get(codename="change_bookingsemester", content_type=content_type)
        self.user.user_permissions.add(permission)

        # Assert no error when updating booking semester with permission
        response = self.update_booking_semester(user=self.user)
        self.assertResponseNoErrors(response)
