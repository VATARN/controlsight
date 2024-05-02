"use client";
import { Card } from "@radix-ui/themes";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

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

  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-7)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
