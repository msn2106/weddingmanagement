export const getStatusBadge = (status: string) => {
  const styles = {
    attending: 'bg-green-100 text-green-800',
    not_attending: 'bg-red-100 text-red-800',
    maybe: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-gray-100 text-gray-800',
    paid: 'bg-green-100 text-green-800',
    advance_paid: 'bg-yellow-100 text-yellow-800',
  };
  return styles[status as keyof typeof styles] || styles.pending;
};
