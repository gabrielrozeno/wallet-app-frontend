const renderFinancesList = (data) => {
  //
  const table = document.getElementById("finances-table");
  data.map((item) => {
    const tableRow = document.createElement("tr");

    //title
    const titleTd = document.createElement("td");
    const titleText = document.createTextNode(item.title);
    titleTd.className = "left";
    titleTd.appendChild(titleText);
    tableRow.appendChild(titleTd);

    //category
    const categoryTd = document.createElement("td");
    const categoryText = document.createTextNode(item.name);
    categoryTd.className = "left";
    categoryTd.appendChild(categoryText);
    tableRow.appendChild(categoryTd);

    table.appendChild(tableRow);

    //data
    const dateTd = document.createElement("td");
    const dateText = document.createTextNode(
      new Date(item.date).toLocaleDateString()
    );
    dateTd.className = "left";
    dateTd.appendChild(dateText);
    tableRow.appendChild(dateTd);

    table.appendChild(tableRow);

    //valor
    const valueTd = document.createElement("td");
    const valueText = document.createTextNode(
      new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(item.value)
    );
    valueTd.className = "center";
    valueTd.appendChild(valueText);
    tableRow.appendChild(valueTd);

    //deletar
    const deleteTd = document.createElement("td");
    const deleteText = document.createTextNode("Deletar");
    deleteTd.className = "right";
    deleteTd.appendChild(deleteText);
    tableRow.appendChild(deleteTd);

    table.appendChild(tableRow);
  });
};

const renderFinanceElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues + expenses;

  // render total items
  const financeCard1 = document.getElementById("finance-card-1");
  const totalItemsText = document.createTextNode(totalItems);
  const totalItemsTextElement = document.createElement("h2");
  totalItemsTextElement.className = "mt smaller";
  totalItemsTextElement.appendChild(totalItemsText);
  financeCard1.appendChild(totalItemsTextElement);

  // render revenue
  const financeCard2 = document.getElementById("finance-card-2");
  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(revenues)
  );
  const revenueTextElement = document.createElement("h2");
  revenueTextElement.className = "mt smaller";
  revenueTextElement.appendChild(revenueText);
  financeCard2.appendChild(revenueTextElement);

  // render expenses
  const financeCard3 = document.getElementById("finance-card-3");
  const expenseText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  const expenseTextElement = document.createElement("h2");
  expenseTextElement.className = "mt smaller";
  expenseTextElement.appendChild(expenseText);
  financeCard3.appendChild(expenseTextElement);

  // render total
  const financeCard4 = document.getElementById("finance-card-4");
  const totalText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalValue)
  );
  const totalTextElement = document.createElement("h2");
  totalTextElement.className = "mt smaller";
  totalTextElement.style.color = "#5936CD";
  totalTextElement.appendChild(totalText);
  financeCard4.appendChild(totalTextElement);
};

const onLoadFinancesData = async () => {
  try {
    const email = localStorage.getItem("@WalletApp:userEmail");
    const date = "2022-12-15";
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinanceElements(data);
    renderFinancesList(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onLoadUserInfo = () => {
  // add email element
  const email = localStorage.getItem("@WalletApp:userEmail");
  const name = localStorage.getItem("@WalletApp:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("user-avatar");

  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);

  navbarUserInfo.appendChild(emailElement);

  // logout element
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("Sair");
  logoutElement.appendChild(logoutText);

  navbarUserInfo.appendChild(logoutElement);

  // avatar user initial
  const navbarUserAvatarElement = document.createElement("h3");
  const navbarUserAvatarText = document.createTextNode(name.charAt(0));
  navbarUserAvatarElement.appendChild(navbarUserAvatarText);

  navbarUserAvatar.appendChild(navbarUserAvatarElement);
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
};
