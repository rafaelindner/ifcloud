# Projeto IF-Cloud
  
![H2Cloud – Heterogeneous Health Cloud (Nuvem de Saúde Heterogênea)](./img/IF-Cloud-paper-CBIS2024.png)

A Figura ilustra a visão  geral do ecossistema de saúde digital para monitoramento contínuo de biossinais com troca de recursos no padrão FHIR. As funcionalidades das APIs em nuvem para suportar projetos IoT e aplicações web de biossinais podem ser resumidas em CRUD (Criar/Ler/Atualizar/Excluir ) e Processamento. **IF-Cloud** - *API FHIR para Integração de projetos de saúde digital* - compõe o ecossistema como API de processamento.

IF-Cloud auomatiza a execução de scripts Python que tem upload realizado por meio de uma interface gráfica. IF-Cloud utiliza os dados dos recursos FHIR provenientes de alguma API de CRUD e retorna um outro recurso FHIR com os dados processados pelos scripts. Ou seja, IF-Cloud permite a inclusão de novas funcionalidades em ecossistemas de saúde digital mediante um upload de arquivos de script.


## Requisitos
- NodeJS [https://nodejs.org/en/](https://nodejs.org/en/)
- Python [https://www.python.org/](https://www.python.org/)
- Pip - O gerenciador de pacotes do Python.
- Git - Para clonar o repositório.
- Aplicação IF-Cloud (este repositório)
- Aplicação FHIR que realiza as operações CRUD


IF-Cloud depende de uma API FHIR com operações CRUD para fornecer os dados a serem processados, pois não tem banco de dados. Diversas implementações de APIs FHIR em nuvem estão disponíveis para realizar as operações CRUD.
Nós recomendamos a [nossa API FHIR especializada em biossinais](https://biosignalinfhir.if4health.com.br/api-docs/) e você encontra o código fonte [neste link](https://github.com/if4health/FASS-ECG). Alternativamente, IF-Cloud também pode utilizar recursos FHIR da API pública de testes [HAPI FHIR](https://hapi.fhir.org/baseR4/swagger-ui/).


## Instalação
1. Faca download deste repositorio
```sh
git clone https://github.com/if4health/ifcloud .
cd ifcloud/
```
2. Configure variáveis de ambiente:

| Rota | Descrição |
|------|-----------|
| `FHIR_API_URL` | URL da API FHIR que realiza as operações CRUD |


3. Instale as dependencias de NodeJS para este projeto 
```sh
npm install
```

4. Instale as dependencias de Python para este projeto 
```sh
pip install -r requirements.txt
```


## Utilização
Após instalar todas as dependências, você pode iniciar a aplicação com:
```sh
npm start
```
Visualize o IF-Cloud rodando no navegador:
```sh
http://localhost:8000/ifcloud/home
```

**Configuração de IF-Cloud para executar scripts** - IF-Cloud necessita do preenchimento de um JSON de configuração para fins de controle do fluxo de dados da interface e da automação dos scripts Python.

```json
{
    "resourceType": "Observation",
    "id": "63f7f7a39c173811e7128d4c",
    "scriptName": "huff.py",
    "component":
    {
        "index": 2,
        "changeField": "data",
        "returnOnlyFieldsComponent": false
    }
}
```

- `resourceType` - tipo de Recurso FHIR que IF-Cloud deverá buscar na API de CRUD;
- `id` - identificador do Recurso FHIR que a aplicação deverá buscar na API de CRUD;
- `scriptName` - nome do script disponível no diretório Python SRC a ser executado.
- `component` - Configura qual a chave do Recurso FHIR a ser buscado deve ser alterado ou retornado pelo script configurado em `scriptName`.
	- `changeField` - determina qual a chave do Recurso FHIR deverá ser alterada;
	- `index` - índice da chave `changeField` a ser alterado no Recurso FHIR;
	- `returnOnlyFieldsComponent` - se IF-Cloud irá retornar somente os campos alterados ou todo o Recurso FHIR para o solicitante.


![Interface de Usuário do IF-Cloud](./img/IF-Cloud-UI.png)

Para facilitar a utilização, IF-Cloud disponibiliza uma interface de usuário.
- **Item (A)** - Ao selecionar um script em python para fazer upload em IF-Cloud (menu Upload), ele fica salvo em uma lista de scipts disponiveis e pode ser executado a qualquer momento.
- **Item (B)** - Uma das formas de carregar o JSON de configuração de IF-Cloud é clicando no menu Form da UI e preenchendo o formulário.
- **Item (C)** - Ao enviar o formulário, IF-Cloud executa o script selecionado e redireciona uma página informativa mostrando o resultado da execucao do script conforme as configurações do JSON de configuração.



## Rotas

IF-Cloud oferece duas categorias de rotas na chamada dos scripts carregados na nuvem. 

A chamada por **rota direta** é indicada para testes de funcionamento do próprio script pelo usuário/desenvolvedor. Esta abordagem não tem acesso aos recursos da API de CRUD e também não gera recursos FHIR, pois IF-Cloud faz apenas a execução de um script Python disponível no diretório. 

A chamada na **rota principal** é o método de execução dos scripts cuja resposta pode ser retornada em um recurso FHIR. Sempre que IF-Cloud receber uma requisição na rota principal, é necessário buscar os dados salvos na API de CRUD para serem sobrescritos com processamento intermediado pelos scripts salvos em IF-Cloud. 


***Pendencias que descobri ao desenvolver o README.md:***
1. refatorar IF-Cloud para que a requisicao `POST /run_script/operation/` seja um `POST /run_script/operation/:id`. Esta certo no artigo, mas certo no codigo-fonte.
2. fazer o menu about da UI de ifcloud

 
| Rota               | Metodo | Descricao                                                                                                  |
|--------------------|--------|------------------------------------------------------------------------------------------------------------|
| `/run_script/direct/:script_name` | GET | Executa o script `script_name` salvo em IF-Cloud sem parâmetros de entrada |
| `/run_script/direct/params` | POST | Executa um script salvo em IF-Cloud com parâmetros de entrada `{"scriptName": ":script_name", "params": ":params_list}` |
| `/run_script/operation/:id` | POST | IF-Cloud executa um script de acordo com o JSON de configuração e modifica o conteúdo de uma chave de um recurso FHIR proveniente da API de CRUD `$(FHIR_API_URL)` |
| `/ifcloud/myForm` | POST | envia o JSON de configuração para IF-Cloud sem necessitar de UI |



## [TO DO] Deploy na AWS - VAMOS FAZER?
#### [Este vídeo](https://www.youtube.com/watch?v=Mb1zueb-s5k) demonstra como fazer Deploy de IF-Cloud na AWS.
