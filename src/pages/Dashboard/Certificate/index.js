import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import { toast } from "react-toastify";

import Certificate from "../../../components/Certificate/Certificate";
import ForbidText from "../../../components/ForbidText";

export default function CertificatePage() {
  const [userData, setUserData] = useState(null);
  const { certificate } = useApi();

  useEffect(() => {
    certificate.getUserCertificate()
      .then((response) => setUserData(response.data))
      .catch((error) => {
        if (error.response.status === 404) return;
        toast(error.response.data.message);
      });
  }, []);

  return (
    <>
      {userData ?
        (userData.type?.name === "Presencial" && userData?.activities.length === 0 ?
          <ForbidText>Você precisa se inscrever em alguma atividade!</ForbidText>
          :
          <Certificate userData={userData} />
        )
        :
        <ForbidText>Você precisa completar o cadastro para ter acesso ao certificado!</ForbidText>
      }
    </>
  );
}
