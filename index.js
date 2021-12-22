// danh sách thành phố
function successHandler() {
    $.ajax({
        type: "GET",
        //ten Api
        url: "http://localhost:8080/cities",
        success: function (data) {
            let content = '   <tr>\n' +
                '        <th>ID</th>\n' +
                '        <th>Thành phố</th>\n' +
                '        <th>Quốc gia</th>\n' +
                '        <th>Xóa</th>\n' +
                '        <th>Sửa</th>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getBlog(data[i]);
            }
            document.getElementById('city-list').innerHTML = content;
        }
    })
}

function getBlog(city) {
    return `<tr>
                        <td>${city.id}</td>
                        <td><a onclick="showCity(this)" href="${city.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">${city.name} </a></td>
                        <td>${city.national?.name}</td>` +
        `<td><button value="${city.id}" onclick="notifications(this)" class="btn btn-secondary " data-bs-toggle="modal" data-bs-target="#exampleModal1">Xóa</button></td>` +
        ` <td><button value="${city.id}" onclick="openFormEdit(this)" class="btn btn-secondary">Sửa</button></td>`

}

//đóng mở form create
function openFormCreate() {
    document.getElementById("add-city").style.display = "block"
}

function closeFormCreate() {
    document.getElementById("add-city").style.display = "none"
}

// tạo mới thành phố
function createNewCity() {
    //lay du lieu
    let name = $('#city').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let national = $('#national').val();
    let newCity = {
        name: name,
        area: area,
        population: population,
        gdp: gdp,
        description: description,
        national: {
            id: national
        }
    };
    //goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCity),
        //ten Api
        url: "http://localhost:8080/cities",
        success: successHandler
    })
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

//Xóa thành phố
function notifications(a){
    let id = a.getAttribute("value");
    document.getElementById("show").innerHTML= `<button onclick="deleteCity(${id}) " type="button" class="btn btn-primary" id="delete">Xóa</button>
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`

}



function deleteCity(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/cities/" + id,
        success: function (){
            successHandler()
            $('#exampleModal1g').close()

        }

    })

}

//Sửa thành phố
function openFormEdit(a) {
    let id = a.getAttribute("value");
    $("#edit-city").show()
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/" + id,
        success: function (city) {
            $('#idEdit').val(city.id);
            $('#cityEdit').val(city.name);
            $('#nationalEdit').val(city.national?.name);
            $('#areaEdit').val(city.area);
            $('#populationEdit').val(city.population);
            $('#gdpEdit').val(city.gdp);
            $('#descriptionEdit').val(city.description);
        }
    })
    event.preventDefault();
}

function editCity() {
    //lay du lieu
    let id = $('#idEdit').val();
    let name = $('#cityEdit').val();
    let area = $('#areaEdit').val();
    let population = $('#populationEdit').val();
    let gdp = $('#gdpEdit').val();
    let description = $('#descriptionEdit').val();
    let national = $('#nationalEdit').val();
    let newCity = {
        id: id,
        name: name,
        area: area,
        population: population,
        gdp: gdp,
        description: description,
        national: {
            id: national
        }
    };
    //goi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "PUT",
        data: JSON.stringify(newCity),
        //ten Api
        url: "http://localhost:8080/cities/" + id,
        success: successHandler
    })
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

//đóng form edit
function closeFormEdit() {
    document.getElementById("edit-city").style.display = "none"
}

//hiển thị Quốc gia
function getAllNational(a) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/nationals",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<option value="${data[i].id}">${data[i].name}</option>`
            }
            document.getElementById(a).innerHTML = content
        }
    })
}

//Show city
function showCity(a) {
    let id = a.getAttribute("href");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/" + id,
        success: function (city) {
            let content = `
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Thông tin chi tiết thành phố</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <div class="col-md-12"><label class="labels fw-bold">Tên thành phố</label>
         <input type="text" class="form-control" value="${city.name}" disabled>
         </div>
         <div class="col-md-12"><label class="labels fw-bold">Quốc gia</label>
         <input type="text" class="form-control" value="${city.national?.name}" disabled>
         </div>
         <div class="col-md-12"><label class="labels fw-bold">Diện tích</label>
         <input type="text" class="form-control" value="${city.area}" disabled>
         </div>
         <div class="col-md-12"><label class="labels fw-bold">Dân số</label>
         <input type="text" class="form-control" value="${city.population}" disabled>
         </div>
         <div class="col-md-12"><label class="labels fw-bold">GDP</label>
         <input type="text" class="form-control" value="${city.gdp}" disabled>
         </div>
         <div class="col-md-12"><label class="labels fw-bold">Giới thiệu</label>
         <input type="text" class="form-control" value="${city.description}" disabled>
         </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`
            document.getElementById("show_city").innerHTML = content
        }
    })
    event.preventDefault()
}


getAllNational("national")
getAllNational("nationalEdit")
successHandler()