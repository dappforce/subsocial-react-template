export const toShortAddress = (address: string, lengthOfAddress = 12) => {
  const visibleChars = Math.floor(lengthOfAddress / 2);

  if (address.length > lengthOfAddress) {
    return (
      <>
        {address.slice(0, visibleChars)}&hellip;{address.slice(-visibleChars)}
      </>
    );
  }

  return address;
};
