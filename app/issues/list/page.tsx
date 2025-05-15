import { Table } from "@radix-ui/themes";

import { IssueStatusBadge, Link } from "@/app/components";

import prisma from "@/app/lib/prisma";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@/app/generated/prisma/client";

import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  const { status: unvalidateStatus } = await searchParams;

  const aliasOfSearchParams = await searchParams;

  //validation
  const statuses = Object.values(Status);
  const status = statuses.includes(unvalidateStatus)
    ? unvalidateStatus
    : undefined;

  const where = { status };

  const orderBy = columns
    .map((column) => column.value)
    .includes(aliasOfSearchParams.orderBy)
    ? { [aliasOfSearchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(aliasOfSearchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...aliasOfSearchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === aliasOfSearchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      ></Pagination>
    </div>
  );
};
export const dynamic = "force-dynamic";
// export const revalidate = 0;
export default IssuesPage;
