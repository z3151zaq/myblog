import { Suspense } from "react";

import ModifyForm from "./ModifyForm";
const ModifyEquipmentPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ModifyForm />
    </Suspense>
  );
};

export default ModifyEquipmentPage;
