import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RatingFilter from "@/components/servers-table/components/filters/rating-filter";
import ReviewsFilter from "../filters/reviews-filter";
import { Button } from "@/components/ui/button";
import { useTable } from "../../hooks/use-servers-table";
import { Filter } from "lucide-react";

export default function DesktopTableFilters() {
  const { handleResetReviewRatingFilters, rating, numReviews } = useTable();
  const disableResetButton = rating === 0 && numReviews[0] === 0;

  function handleResetFilters() {
    handleResetReviewRatingFilters();
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Filters <Filter size={14} /></Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col border border-gray-300" align="end">
        <RatingFilter />
        <ReviewsFilter />
        <div className="flex p-6">
          <Button
            className="w-full"
            onClick={handleResetFilters}
            disabled={disableResetButton}
          >
            Reset filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
