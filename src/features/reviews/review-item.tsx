import { CornerDownRight } from "lucide-react";
import { Initials, Stars, StatusPill } from "@/components/shared/data-cells";
import { frDate } from "@/features/demo/demo-data";

export interface ReviewItemData {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  replied: boolean;
  establishment: string;
}

export function ReviewItem({ review }: { review: ReviewItemData }) {
  return (
    <li className="flex gap-3 px-5 py-4">
      <Initials name={review.author} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <p className="text-13 font-semibold">{review.author}</p>
          <Stars rating={review.rating} />
          <span className="text-2xs text-muted-foreground">
            {frDate(review.date)} · {review.establishment}
          </span>
          <span className="ml-auto">
            {review.replied ? (
              <StatusPill tone="success">Répondu</StatusPill>
            ) : review.rating <= 2 ? (
              <StatusPill tone="destructive">À traiter en priorité</StatusPill>
            ) : (
              <StatusPill tone="warning">Sans réponse</StatusPill>
            )}
          </span>
        </div>
        <p className="mt-1.5 text-pretty text-13 text-muted-foreground">{review.text}</p>
        {!review.replied && (
          <p className="mt-2 inline-flex items-center gap-1 text-2xs font-medium text-primary">
            <CornerDownRight className="h-3 w-3" aria-hidden />
            Répondre avec un modèle
          </p>
        )}
      </div>
    </li>
  );
}
