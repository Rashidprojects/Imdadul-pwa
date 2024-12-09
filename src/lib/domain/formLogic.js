// Business logic for installment validation and state update

export const calculateInstallments = (totalAmount, firstInstallment, secondInstallment, thirdInstallment, fourthInstallment) => {
    const first = Number(firstInstallment);
    const second = Number(secondInstallment);
    const third = Number(thirdInstallment);
    const fourth = Number(fourthInstallment);
    const total = Number(totalAmount);
  
    const final2 = first + second;
    const final3 = final2 + third;
    const final4 = final3 + fourth;
  
    const isFirstTry = total - first === 0;
    const isSecondTry = total - final2 === 0;
    const isThirdTry = total - final3 === 0;
    const isFourthTry = total - final4 > 0;
  
    return {
      isFirstTry,
      isSecondTry,
      isThirdTry,
      isFourthTry,
    };
  };
  