import { RatingStar } from "@/components/svgs";

export function Star({ rating }: { rating: string }) {
  if (rating === "5.0") {
    return (
      <>
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
      </>
    );
  } else if (rating === "4.5") {
    return (
      <>
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='half' size />
      </>
    );
  } else if (rating === "4.0") {
    return (
      <>
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='empty' size />
      </>
    );
  } else if (rating === "3.5") {
    return (
      <>
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='half' size />
        <RatingStar kind='empty' size />
      </>
    );
  } else if (rating === "3.0") {
    return (
      <>
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
      </>
    );
  } else if (rating === "2.5") {
    return (
      <>
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='half' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
      </>
    );
  } else if (rating === "2.0") {
    return (
      <>
        <RatingStar kind='full' size />
        <RatingStar kind='full' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
      </>
    );
  } else if (rating === "1.5") {
    return (
      <>
        <RatingStar kind='full' size />
        <RatingStar kind='half' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
      </>
    );
  } else if (rating === "1.0") {
    return (
      <>
        <RatingStar kind='full' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
      </>
    );
  } else if (rating === "0.5") {
    return (
      <>
        <RatingStar kind='half' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
        <RatingStar kind='empty' size />
      </>
    );
  }

  return (
    <>
      <RatingStar kind='empty' size />
      <RatingStar kind='empty' size />
      <RatingStar kind='empty' size />
      <RatingStar kind='empty' size />
      <RatingStar kind='empty' size />
    </>
  );
}
