export function formatDateForSubmission(date) {
  if (!date) return '';
  
  const d = new Date(date);
  // Adjust for timezone offset to maintain local date
  const offset = d.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const adjustedDate = new Date(d.getTime() - offset);
  
  return adjustedDate.toISOString().split('T')[0];
}