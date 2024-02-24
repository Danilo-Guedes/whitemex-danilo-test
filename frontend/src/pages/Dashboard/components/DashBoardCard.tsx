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
    <Link to={href} className="hover:scale-[102%] transition-transform duration-200">
      <Card className="min-w-80">
        <CardHeader>
          <CardTitle className="text-2xl text-secondary text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="card-content">{icon}</CardContent>
        <CardFooter 
        className="flex flex-col items-center"
        >
            <span className="text-muted-foreground">

            {subtitle}
            </span>
            </CardFooter>
      </Card>
    </Link>
  );
}

export default DashBoardCard;
