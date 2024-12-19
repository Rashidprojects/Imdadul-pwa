export const filterAndSortInstallments = (installments) => {
    const today = new Date();
  
    // Convert date strings to Date objects for reliable comparisons
    const pastInstallments = installments
      .filter((inst) => new Date(inst.date) <= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort past installments in ascending order by date
  
    const futureInstallments = installments
      .filter((inst) => new Date(inst.date) > today)
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort future installments in ascending order by date
  
    console.log('Past Installments:', pastInstallments);
    console.log('Future Installments:', futureInstallments);

    // Return both sorted past and future installments
    return [
      ...pastInstallments, // Past installments first
      ...futureInstallments // Future installments after
    ];


  };
  