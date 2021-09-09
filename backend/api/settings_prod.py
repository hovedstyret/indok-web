import os

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

from api.settings import *

DEBUG = False

ALLOWED_HOSTS = ["api.gamma.indokntnu.no", "api.indokntnu.no"]

CORS_ORIGIN_WHITELIST = ["https://gamma.indokntnu.no", "https://indokntnu.no"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "postgres",
        "USER": "postgres",
        "PASSWORD": os.environ.get("password"),
        "HOST": os.environ.get("host"),
        "PORT": 5432,
    }
}

SECRET_KEY = os.environ.get("SECRET_KEY")

DATAPORTEN_ID = os.environ.get("DATAPORTEN_ID")
DATAPORTEN_SECRET = os.environ.get("DATAPORTEN_SECRET")
DATAPORTEN_REDIRECT_URI = os.environ.get("DATAPORTEN_REDIRECT_URI")

GOOGLE_DRIVE_API_KEY = os.environ.get("GOOGLE_DRIVE_API_KEY")


sentry_sdk.init(
    dsn="https://6bd0cd5210c0448aa90879a01db24663@o514678.ingest.sentry.io/5618268",
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True,
)
