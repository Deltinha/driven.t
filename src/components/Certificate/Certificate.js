import styled from "styled-components";
import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import { toast } from "react-toastify";
import CertificationSeal from "../../images/seal-certification.jpg";
import Signature from "../../images/signature-drivent.png";

export default function Certificate() {
  const [userData, setUserData] = useState({});
  const { certificate } = useApi();

  useEffect(() => {
    certificate.getUserCertificate()
      .then((response) => setUserData(response.data))
      .catch((error) => toast(error.response.data.message));
  }, []);

  return (
    <CertificateBox>
      <TopBox>
        <h1>DRIVENT</h1>
      </TopBox>
      <MiddleBox>
        <MiddleBoxMsg>
          <h1>Certificado</h1>
        </MiddleBoxMsg>
        <MiddleBoxDescription>
          <h2>
            Certificamos que {userData?.name}, portador(a) do cpf: {userData?.cpf}, participou do
            evento Drivent de forma {userData.type?.name.toLowerCase()}, com carga horária de 15 horas.
          </h2>
        </MiddleBoxDescription>
      </MiddleBox>
      <BottomBox>
        <Signatures>
          <img src={Signature} alt="signature"/>
        </Signatures>
        <Seal>
          <img src={CertificationSeal} alt="seal"/>
        </Seal>
      </BottomBox>
    </CertificateBox>
  );
}

const CertificateBox = styled.div`
  height: 100%;
  border-radius: 5px;
  border: 10px solid black;
`;

const TopBox = styled.div`
  height: 20%;
  display: flex;
  align-items: center;
  padding: 15px;
  h1 {
    font-family: 'Staatliches', cursive;
    font-size: 35px;
  }
`;

const MiddleBox = styled.div`
  background: rgb(255,213,128);
background: linear-gradient(0deg, rgba(255,213,128,1) 0%, rgba(250,66,152,1) 100%);
  height: 50%;
`;

const MiddleBoxMsg = styled.div`
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-family: 'Staatliches', cursive;
    font-size: 30px;
  }
`;

const MiddleBoxDescription = styled.div`
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;

  h2 {
    font-family: 'Satisfy', cursive;
    font-size: 30px;
    line-height: 50px;
  }
`;

const BottomBox = styled.div`
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  img {
    height: 130px;
  }
`;

const Signatures = styled.div``;

const Seal = styled.div``;
