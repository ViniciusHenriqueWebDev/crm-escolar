# CRM Escolar

## Descrição
O CRM Escolar é uma plataforma de gestão de relacionamento com clientes desenvolvida para instituições de ensino. Ela facilita o acompanhamento das interações com estudantes e responsáveis, a otimização dos processos administrativos e a melhoria da comunicação escolar.

## Tecnologias Utilizadas
- **Back-end:** ASP.NET Core Web API
- **Front-end:** React, Redux, Material-UI
- **Banco de Dados:** SQL Server, MongoDB
- **Infraestrutura:** Azure.

## Configuração do Back-end

### Pré-requisitos
- .NET 5.0 SDK (ou superior)
- SQL Server (ou outro banco de dados compatível)

### Instalação e Execução
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/crm-escolar-backend.git

# Vá para o diretório do back-end
cd crm-escolar-backend

# Restaure os pacotes NuGet
dotnet restore

# Aplique as migrações do Entity Framework (se aplicável)
dotnet ef database update

# Execute a aplicação
dotnet run
