FROM mcr.microsoft.com/dotnet/sdk:5.0

# Install common tooling
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends curl build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && apt-get -y install git-lfs nodejs

ENV PATH="$PATH:/root/.dotnet/tools:/workspaces/tools"

RUN dotnet tool install -g powershell \
    && git lfs install