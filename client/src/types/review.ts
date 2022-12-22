import { UseMutationResult } from "@tanstack/react-query";
interface Review {
  _id: string;
  author: string;
  content: string;
  star: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  item: string;
  __v: string;
}

export interface RatingStarsProps {
  rating: string;
  myReview?: Review;
  onSetRating: React.Dispatch<React.SetStateAction<string>>;
  onCreateReview?: UseMutationResult<
    void,
    unknown,
    {
      content: string;
      star: number;
    },
    unknown
  >;
  onUpdateReview?: UseMutationResult<
    void,
    unknown,
    {
      reviewId: string;
      content?: string | undefined;
      star?: number | undefined;
    },
    unknown
  >;
}

export interface ReviewQuery {
  user: Review;
  reviews: Review[];
}

export interface ReviewsProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  reviewAmount: number;
  data: ReviewQuery;
  onSetReviewText: React.Dispatch<React.SetStateAction<string>>;
  onRemoveReview: UseMutationResult<
    void,
    unknown,
    {
      reviewId: string;
    },
    unknown
  >;
  onSetIsTextAreaShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ReviewItemProps = {
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  review?: Review;
  myReview?: Review;
  onSetReviewText?: React.Dispatch<React.SetStateAction<string>>;
  onRemoveReview?: UseMutationResult<
    void,
    unknown,
    {
      reviewId: string;
    },
    unknown
  >;
  onSetIsTextAreaShowing?: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ReviewInputProps {
  isFocus: boolean;
  setIsHover: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  reviewText: string;
  handleReviewFocus: () => void;
  handleReviewBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  handleTextAreaChange: ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isTextAreaShowing: boolean;
  handleCancelClick: () => void;
  reviewData?: ReviewQuery;
  handleUpdateClick: () => void;
  handleRegisterClick: () => void;
}

export interface StarRatingProps {
  _id: string;
  rating: string;
  setRating: React.Dispatch<React.SetStateAction<string>>;
  stars: number;
  reviewAmount: number;
}