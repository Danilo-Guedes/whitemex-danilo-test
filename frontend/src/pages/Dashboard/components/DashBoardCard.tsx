import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
}

function DashBoardCard({ icon, title, subtitle, href }: CardProps) {
  return (
    <Link to={href}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-secondary text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="card-content">{icon}</CardContent>
        <CardFooter className="text-muted-foreground">{subtitle}</CardFooter>
      </Card>
    </Link>
  );
}

export default DashBoardCard;
