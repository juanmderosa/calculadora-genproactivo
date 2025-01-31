import { useEffect, useState } from "react";
import { getUfChile } from "../lib/lib";

export const UFValue = () => {
  const [ufValue, setUfValue] = useState<number | null>(null);
  const currentDate = Date();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formattedDate = formatDate(currentDate);
  useEffect(() => {
    getUfChile().then((data) => setUfValue(data.serie[0].valor));
  });
  return (
    <div>
      <h2>
        Valor UF al {formattedDate}: {ufValue}
      </h2>
    </div>
  );
};
