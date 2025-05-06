import React from "react";
import IssueForm from "../../_components/IssueForm";
import prisma from "@/app/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}
const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) notFound();
  else return <IssueForm issue={issue} />;
};

export default EditIssuePage;
