/**
 * Send the score to api.
 * @param {Number} points The total points of player.
 */
function send_score(points) {
  //If the player win the game or lose the game.
  let data = new FormData();
  data.append("action", "insert");
  data.append("id_game", 3);
  data.append("id_user", 1);
  data.append("id_cycle", 18);
  data.append("points", points);

  fetch("./backend/index.php", {
    method: "POST",
    cache: "no-cache",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error(error));
}

/**
 * Get ranking from api.
 * @param {Element} table The table to insert records.
 */
function get_ranking(table) {
  let data = new FormData();
  data.append("action", "get");
  data.append("top", 5);
  data.append("id_game", 3);
  data.append("id_user", 1);
  data.append("id_cycle", 18);

  fetch("./backend/index.php", {
    method: "POST",
    cache: "no-cache",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      for (let y = 0; y < data.data.length; y++) {
        let rowTable = table.insertRow(y);
        let objectLength = Object.getOwnPropertyNames(data.data[y]).length;
        for (let h = 0; h < objectLength; h++) {
          let column = rowTable.insertCell(h);

          if (h === 0) {
            column.innerHTML = y + 1;
          } else {
            column.innerHTML = Object.values(data.data[y])[h];
          }

          column.style.color = "white";
          column.style.fontSize = "50px";
        }
      }

      if (data.data_user !== null) {
        let rowTable = table.insertRow(data.data.length);
        let objectLength = Object.getOwnPropertyNames(data.data_user).length;
        for (let h = 0; h < objectLength; h++) {
          let column = rowTable.insertCell(h);

          if (h === 0) {
            column.innerHTML = "-";
          } else {
            column.innerHTML = Object.values(data.data_user)[h];
          }
          column.style.color = "white";
          column.style.fontSize = "50px";
        }
      }
    })
    .catch((error) => console.error(error));
}

/**
 * Get all jobs oportunities from
 * @param {Element} table The table to insert records.
 */
function get_jobs() {
  let data = new FormData();
  data.append("action", "get_jobs_oportunities");
  data.append("id_cycle", 18);

  fetch("./backend/index.php", {
    method: "POST",
    cache: "no-cache",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      job_oportunities = data.data;
    })
    .catch((error) => console.error(error));
}

/**
 * Get cycle of job oportunities
 * @param {Element} table The table to insert records.
 */
function get_cycles() {
  let data = new FormData();
  data.append("action", "get_all_cycles");
  data.append("id_cycle", 18);

  fetch("./backend/index.php", {
    method: "POST",
    cache: "no-cache",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      cycles = data.data;
    })
    .catch((error) => console.error(error));
}
