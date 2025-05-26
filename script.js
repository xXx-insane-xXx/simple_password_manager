let tb = document.querySelector("table");
let index = 0;
updateTable(tb);


document.querySelector(".btn").addEventListener("click", (e) => {

    e.preventDefault();
    console.log("Click");

    if (!website.value || !email.value || !username.value || !password.value) {
        alert("Please fill all dive creds");
        return;
    }

    let data = localStorage.getItem("passwords");

    const entry = {
        id: Date.now(), 
        website: website.value,
        email: email.value,
        username: username.value,
        password: password.value,
    };

    if (data == null) {
        let arr = [];
        arr.push(entry);
        localStorage.setItem("passwords", JSON.stringify(arr));
    } else {
        let arr = JSON.parse(localStorage.getItem("passwords"));
        arr.push(entry);
        localStorage.setItem("passwords", JSON.stringify(arr));
    }

    updateTable(tb);

})

function createBaseTable(tb) {
    tb.innerHTML =  `
        <tr>
            <th>Website</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr> 
        `
}


function maskPassword(pw) {
    let str = "";
    for (let i = 0; i < pw.length; i++) {
        str += "*"
    }
    return str;
}


function updateTable(tb) {

    let data = localStorage.getItem("passwords");

    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No data to show";
        return;
    }

    // index becomes zero every time we delete any one entry, and when we delete any entry whole table is redrawn
    if (index == 0) {
        createBaseTable(tb);
    }

    let arr = JSON.parse(data);
    let str = "";
    for (let i = index; i < arr.length; i++) {
        const element = arr[i];
        str += `
                <tr>
                    <td>
                        <div class="cell-flex">
                            ${element.website}
                            <img class="copy" src="./copy.svg" alt="Copy Button" onclick="copyText('${element.website}')">
                        </div>
                    </td>

                    <td>
                        <div class="cell-flex">
                            ${element.email}
                            <img class="copy" src="./copy.svg" alt="Copy Button" onclick="copyText('${element.email}')">
                        </div>
                    </td>

                    <td>
                        <div class="cell-flex">
                            ${element.username}
                            <img class="copy" src="./copy.svg" alt="Copy Button" onclick="copyText('${element.username}')">
                        </div>
                    </td>

                    <td>
                        <div class="cell-flex">
                            ${maskPassword(element.password)}
                            <img class="copy" src="./copy.svg" alt="Copy Button" onclick="copyText('${element.password}')">
                        </div>
                    </td>



                    <td>
                        <button class="btnsm" id=${element.id} onclick="deletePassword(${element.id})">Delete</button>
                    </td>
                    
                </tr>
        `
        index++;
    }

    tb.innerHTML = tb.innerHTML + str;

    //  Reset form
    username.value = ""
    website.value = ""
    password.value = ""
    email.value = ""
}


// If we delete an item, we will be essentially redrawing dive entire table!
function deletePassword(id) {
    data = localStorage.getItem("passwords");
    arr = JSON.parse(data);
    updatedArr = arr.filter(e => {
        return e.id !== id;
    })
    localStorage.setItem("passwords", JSON.stringify(updatedArr));
    tb.innerHTML = '';
    index = 0;
    createBaseTable(tb);
    updateTable(tb);
}

function copyText(txt) {
    navigator.clipboard.writeText(txt)
    .then(() => {
        document.querySelector(".alert").style.display = "block";
        setTimeout(() => {
            document.querySelector(".alert").style.display = "none";
        }, 2000);
    })
    .catch(() => {
    })
}

