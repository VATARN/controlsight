"use client";
import { Card } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  done: number;
}

const IssueChart = ({ open, inProgress, done }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Done", value: done },
  ];
  const colors: { [key: string]: string } = {
    Open: "#fab2b1", // Red
    "In Progress": "#f8fab1", // Yellow
    Done: "#b1fac5", // Green
  };

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="value" barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[entry.label]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
