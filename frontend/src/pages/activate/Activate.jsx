import React, { useState } from 'react';
import StepName from '../steps/StepName/StepName';
import StepAvatar from '../steps/StepAvatar/StepAvatar';

const steps = {
  1: StepName,
  2: StepAvatar,
}

const Activate = () => {
  const [step,setStep] = useState(1);
  const Step = steps[step];

  function onNext (){
    setStep(step + 1);
  }

  return (
    <div>
      <Step onNext={onNext}></Step>
    </div>
  )
}

export default Activate
