import MultiStep from "react-multistep";
import * as React from "react"
import { ChildForm } from "../ChildForm/ChildForm";
import { CribroomForm } from "../CribroomForm/CribroomForm";

export default function MultiStepForm(){
    return (
      <MultiStep activeStep={0}>
        <ChildForm title="Paso 1" />
        <CribroomForm title="paso 2" />
      </MultiStep>
    );
}