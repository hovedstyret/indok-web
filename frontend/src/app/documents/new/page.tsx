"use client";

import { useAlerts } from "@/app/components/Alerts";
import { useFileUpload } from "@/app/components/FileUpload";
import { graphql } from "@/gql/app";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertDriveFile } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Card, CardActions, CardContent, CircularProgress, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  file: z.instanceof(File),
  description: z.string().optional(),
  categories: z.array(z.object({ id: z.string() })).optional(),
});

type NewDocumentForm = z.infer<typeof schema>;

export default function Page() {
  const [createDocument] = useMutation(
    graphql(`
      mutation NewDocumentPage_CreateDocument($data: CreateDocumentInput!) {
        createDocument(data: $data) {
          document {
            id
            name
          }
          uploadUrl
        }
      }
    `)
  );

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<NewDocumentForm>({
    defaultValues: {
      name: "",
      file: undefined,
    },
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const { notify } = useAlerts();
  const { uploadFile, loading, error, completed } = useFileUpload({
    fileTypeAllowList: ["pdf"],
    onComplete() {
      notify({ message: "Dokumentet er lastet opp", type: "success" });
      router.push("/documents");
    },
  });

  async function onSubmit(formData: NewDocumentForm) {
    const { file, name } = formData;
    if (!file) return;
    const fileExtension = file.name.split(".").pop();
    if (!fileExtension) return;
    createDocument({
      variables: {
        data: {
          name,
          fileExtension,
        },
      },
      onCompleted(data) {
        const uploadUrl = data.createDocument.uploadUrl;
        uploadFile(file, uploadUrl);
      },
    });
  }
  const fileInputRef = useRef<HTMLInputElement>(null);
  function onAddDocumentClick() {
    fileInputRef.current?.click();
  }

  const handleAddDocument = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) setValue("file", uploadedFile);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {loading && <CircularProgress />}
      {error && <Box>{error.message}</Box>}
      {completed && <Box>Document uploaded</Box>}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input hidden type="file" ref={fileInputRef} onChange={handleAddDocument} />
          <CardContent>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                {...register("name")}
                label="Navn"
                error={Boolean(errors.name)}
                helperText={errors.name?.message ?? " "}
              />
              <Controller
                control={control}
                name="file"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    value={field.value?.name ?? "Legg til dokument"}
                    onClick={onAddDocumentClick}
                    type="button"
                    label="Dokument"
                    placeholder="Legg til dokument"
                    inputMode="none"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: <InsertDriveFile />,
                    }}
                    error={Boolean(error)}
                    helperText={error?.message ?? " "}
                  />
                )}
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <LoadingButton type="submit" loading={loading}>
              Opprett
            </LoadingButton>
          </CardActions>
        </form>
      </Card>
    </>
  );
}
