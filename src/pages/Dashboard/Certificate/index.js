import { useState, useEffect } from "react";
import styled from "styled-components";
import useApi from "../../../hooks/useApi";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
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

  function handlePrint() {
    const certificate = document.querySelector("#toPrint");
    html2canvas(certificate)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const pdf = new jsPDF({
          orientation: "landscape",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const widthRatio = (pageWidth / canvas.width);
        const heightRatio = (pageHeight / canvas.height);
        const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

        const canvasWidth = canvas.width * ratio;
        const canvasHeight = canvas.height * ratio;

        const marginX = (pageWidth - canvasWidth) / 2;
        const marginY = (pageHeight - canvasHeight) / 2;

        pdf.addImage(imgData, "JPEG", marginX, marginY, canvasWidth, canvasHeight);
        pdf.save("certificate.pdf");
      });
  }

  return (
    <>
      {userData ?
        (userData.type?.name === "Presencial" && userData?.activities.length === 0 ?
          <ForbidText>Você precisa se inscrever em alguma atividade!</ForbidText>
          :
          (
            <Div>
              <Print id="toPrint">
                <Certificate userData={userData} />
              </Print>
              <Button onClick={handlePrint}>Clique para salvar</Button>
            </Div>
          )
        )
        :
        <ForbidText>Você precisa completar o cadastro para ter acesso ao certificado!</ForbidText>
      }
    </>
  );
}

const Div = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const Print = styled.div`
  height: 100%;
`;

const Button = styled.button`
  display: block;
  margin-top: 17px;
  background-color: #E0E0E0;
  border: 0;
  border-radius: 4px;
  height: 37px;
  width: 180px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  font-size: 14px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;

  @media (max-width: 600px) {
    margin: 17px auto;
  } 
`;
