"use client";

import { signIn, useSession } from "next-auth/react";
import Container from "../components/Container/Container";
import Button from "@/components/Button/Button";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function Home() {
  const { data } = useSession();
  const [image, setImage] = useState<File | null>(null);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) {
      return;
    }
    const { type, name } = image;
    const presignedRequest = await axios.post(
      "http://localhost:3001/s3/generate-presigned-url",
      {
        fileType: type,
        fileName: name,
      }
    );
    console.log(presignedRequest);
    if (presignedRequest.data) {
      const s3 = await axios.put(presignedRequest.data.url, image, {
        headers: {
          "Content-Type": type,
        },
      });
      console.log(s3);
    }
  };
  return (
    <Container>
      <div className="bg-background">
        <h1>Gym progress</h1>
        <p>
          Olá, seja bem vindo ao Gym Progress, um sistema para registro e
          progressão do seu físico, em fotos.
        </p>
        <Button onClick={() => signIn("google")}>
          Entre e experimente agora mesmo
        </Button>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
          <input type="submit" value="Enviar"></input>
        </form>
      </div>
    </Container>
  );
}
