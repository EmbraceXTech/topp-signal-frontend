import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function HistoryTab() {
  return (
    <div>
      <Table removeWrapper aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>COIN</TableColumn>
          <TableColumn>TIME SLOT</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>TICKETS</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>KUB</TableCell>
            <TableCell>12:00</TableCell>
            <TableCell>100</TableCell>
            <TableCell>100</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>CLAIM</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>KUB</TableCell>
            <TableCell>12:00</TableCell>
            <TableCell>100</TableCell>
            <TableCell>100</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>CLAIM</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>KUB</TableCell>
            <TableCell>12:00</TableCell>
            <TableCell>100</TableCell>
            <TableCell>100</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>CLAIM</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>KUB</TableCell>
            <TableCell>12:00</TableCell>
            <TableCell>100</TableCell>
            <TableCell>100</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>CLAIM</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
