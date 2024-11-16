import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function PredictionTable({
  isWrapper = false,
}: {
  isWrapper?: boolean;
}) {
  return (
    <Table
      removeWrapper={!isWrapper}
      aria-label="Example static collection table"
    >
      <TableHeader>
        <TableColumn>USER</TableColumn>
        <TableColumn>TIME SLOT</TableColumn>
        <TableColumn>PRICE</TableColumn>
        <TableColumn>TICKETS</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>0x1234567890</TableCell>
          <TableCell>12:00</TableCell>
          <TableCell>100</TableCell>
          <TableCell>100</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>0x1234567890</TableCell>
          <TableCell>12:00</TableCell>
          <TableCell>100</TableCell>
          <TableCell>100</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>0x1234567890</TableCell>
          <TableCell>12:00</TableCell>
          <TableCell>100</TableCell>
          <TableCell>100</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>0x1234567890</TableCell>
          <TableCell>12:00</TableCell>
          <TableCell>100</TableCell>
          <TableCell>100</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
