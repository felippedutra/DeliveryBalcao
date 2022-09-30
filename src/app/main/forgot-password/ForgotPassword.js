import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import GeneralAlert from '../../utilities/generalAlert';
import Form from './form';

// Validação de Formulário
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Digite um Email válido.')
    .required('Digite um email.'),
});

const defaultValues = {
  email: '',
};

function ForgotPassword() {
  const [loadingConfirmar, setLoadingConfirmar] = useState(false);
  const [alert, setAlert] = useState({
    'type': 'error',
    'message': '',
  });

  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function resetForm() {
    reset();
  }

  async function onSubmit(data) {
    // Inicia o loading
    setLoadingConfirmar(true);

    // Acessando Api para recuperação de Senha
    axios
      .post('Autenticador/RecuperarSenha', data)
      .then((response) => {
        setAlert({
          'type': 'success',
          'message': 'Link para redefinição de senha enviado com sucesso.',
        });
        console.log(response);
        reset();
      })
      .catch((error) => {
        setAlert({
          'type': 'error',
          'message': 'Não foi possível concluir a Solicitação.',
        });
        console.log(error);
      });

    // Finaliza o loading
    setLoadingConfirmar(false);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-60" src="assets/images/logo/logo-resumida.png" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Recuperar senha
          </Typography>

          <div className="mt-8">
            <span>
              Voltar para o <Link to="/sign-in">Login</Link>?
            </span>
          </div>

          {/* Formulário de Login */}
          <div className="w-full">
            {/* Alert para mensagem geral */}
            {alert.message && (
              <div className='mt-10'>
                <GeneralAlert
                  type={alert.type}
                  message={alert.message}
                  setAlert={setAlert}
                />
            </div>
            )}

            {/* Formulária da página */}
            <Form
              loadingLogin={loadingConfirmar}
              dirtyFields={dirtyFields}
              isValid={isValid}
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              resetForm={resetForm}
            />
          </div>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: 'primary.main' }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: 'primary.light' }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <Box
          component="svg"
          className="absolute -top-64 -right-64 opacity-20"
          sx={{ color: 'primary.light' }}
          viewBox="0 0 220 192"
          width="220px"
          height="192px"
          fill="none"
        >
          <defs>
            <pattern
              id="837c3e70-6c3a-44e6-8854-cc48c737b659"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="220" height="192" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
        </Box>

        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Bem-vindo!</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            A SOULSOFT É UMA EMPRESA QUE TRANSFORMAR O SEU NEGÓCIO ATRAVÉS DO SOFTWARE.
          </div>
        </div>
      </Box>
    </div>
  );
}

export default ForgotPassword;
