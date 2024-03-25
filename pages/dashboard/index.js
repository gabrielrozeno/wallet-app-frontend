const renderFinancesList = (data) => {
  //
  const table = document.getElementById("finances-table");
  table.innerHTML = "";

  const headers = document.createElement("tr");
  const titleTable = document.createTextNode("Título");
  const titleTableElement = document.createElement("th");
  titleTableElement.appendChild(titleTable);
  headers.appendChild(titleTableElement);

  const categoryTable = document.createTextNode("Categoria");
  const categoryTableElement = document.createElement("th");
  categoryTableElement.appendChild(categoryTable);
  headers.appendChild(categoryTableElement);

  const dateTable = document.createTextNode("Data");
  const dateTableElement = document.createElement("th");
  dateTableElement.appendChild(dateTable);
  headers.appendChild(dateTableElement);

  const valueTable = document.createTextNode("Valor");
  const valueTableElement = document.createElement("th");
  valueTableElement.appendChild(valueTable);
  valueTableElement.className = "center";
  headers.appendChild(valueTableElement);

  const actionTable = document.createTextNode("Ação");
  const actionTableElement = document.createElement("th");
  actionTableElement.appendChild(actionTable);
  actionTableElement.className = "right";
  headers.appendChild(actionTableElement);

  table.appendChild(headers);

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
  financeCard1.innerHTML = "";

  const totalItemsTitle = document.createTextNode("Total de Lançamentos");
  const totalItemsTitleElement = document.createElement("h3");
  totalItemsTitleElement.appendChild(totalItemsTitle);
  financeCard1.appendChild(totalItemsTitleElement);

  const totalItemsText = document.createTextNode(totalItems);
  const totalItemsTextElement = document.createElement("h2");
  totalItemsTextElement.className = "mt smaller";
  totalItemsTextElement.appendChild(totalItemsText);
  financeCard1.appendChild(totalItemsTextElement);

  // render revenue
  const financeCard2 = document.getElementById("finance-card-2");
  financeCard2.innerHTML = "";

  const revenueTitle = document.createTextNode("Entradas");
  const revenueTitleElement = document.createElement("h3");
  revenueTitleElement.appendChild(revenueTitle);
  financeCard2.appendChild(revenueTitleElement);

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
  financeCard3.innerHTML = "";

  const expensesTitle = document.createTextNode("Saídas");
  const expensesTitleElement = document.createElement("h3");
  expensesTitleElement.appendChild(expensesTitle);
  financeCard3.appendChild(expensesTitleElement);

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
  financeCard4.innerHTML = "";

  const totalTitle = document.createTextNode("Saldo Final");
  const totalTitleElement = document.createElement("h3");
  totalTitleElement.appendChild(totalTitle);
  financeCard4.appendChild(totalTitleElement);

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

const onLoadCategories = async () => {
  try {
    const categoriesSelect = document.getElementById("category");
    const response = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/categories`,
      {
        method: "GET",
      }
    );
    const categoriesResult = await response.json();
    categoriesResult.map((category) => {
      const option = document.createElement("option");
      const categoryText = document.createTextNode(category.name);
      option.id = `category_${category.id}`;
      option.value = category.id;
      option.appendChild(categoryText);
      categoriesSelect.appendChild(option);
    });
  } catch (error) {
    console.log({ error });
  }
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

const onClickCloseModal = () => {
  const modalbg = document.getElementById("modal-bg");
  modalbg.style.visibility = "collapse";
};
const onClickOpenModal = () => {
  const modalbg = document.getElementById("modal-bg");
  modalbg.style.visibility = "visible";
};

const onCallCreateFinance = async (data) => {
  const email = localStorage.getItem("@WalletApp:userEmail");
  const response = await fetch(
    "https://mp-wallet-app-api.herokuapp.com/finances",
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        email: email,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    }
  );
};

const onCreateFinanceRelease = async (target) => {
  try {
    const title = target[0].value;
    const value = Number(target[1].value);
    const date = target[2].value;
    const category = Number(target[3].value);

    const result = onCallCreateFinance({
      title,
      value,
      date,
      category_id: category,
    });

    if (result.error) {
      alert("Erro ao adicionar transação");
      return;
    }

    onClickCloseModal();
    onLoadFinancesData();
    renderFinanceElements();
  } catch (error) {
    console.log({ error });
  }
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
  onLoadCategories();

  const form = document.getElementById("add-item-form");
  form.onsubmit = (e) => {
    e.preventDefault();
    onCreateFinanceRelease(e.target);
  };
};
