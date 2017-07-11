$(function () {
    clearTableAndPopulate();

    $("#show-add").on('click', function () {
        $(".modal-title").text('Add Person');
        $("#update").hide();
        $("#add").show();
        $(".modal").modal();
    });

    $("#add").on('click', function () {
        var person = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            age: $("#age").val()
        };
        $.post('/home/add', person, function () {
            clearTableAndPopulate(function() {
                $(".modal").modal('hide');
                clearModal();
            });
        });
    });

    $("#update").on('click', function () {
        var id = $(this).data('person-id');
        var person = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            age: $("#age").val(),
            id: id
        };
        $.post('/home/update', person, function () {
            clearTableAndPopulate();
            $(".modal").modal('hide');
            clearModal();
        });
    });

    function clearModal() {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
    }

    
    $(".table").on('click', '.edit', function () {
        $(".modal-title").text('Edit Person');
        $("#update").show();
        $("#add").hide();
        $(".modal").modal();
        
        var button = $(this);
        var row = button.closest('tr');
        var firstName = row.find('td:eq(0)').text();
        var lastName = row.find('td:eq(1)').text();
        var age = row.find('td:eq(2)').text();
        $("#firstName").val(firstName);
        $("#lastName").val(lastName);
        $("#age").val(age);
        $("#update").data('person-id', button.data('person-id'));
    });

    $(".table").on('click', '.delete', function() {
        var id = $(this).data('person-id');
        $.post('/home/delete', {personId: id}, function() {
            clearTableAndPopulate();
        });
    });
    
    function clearTableAndPopulate(cb) {
        $(".table tr:gt(0)").remove();
        $.get('/home/getpeople', function (result) {
            result.forEach(function (person) {
                $(".table").append(`<tr><td>${person.FirstName}</td><td>${person.LastName}</td>
                    <td>${person.Age}</td><td><button class='btn btn-warning edit'
                    data-person-id='${person.Id}'>Edit</button><button class='btn btn-danger delete'
                    data-person-id='${person.Id}'>Delete</button>
                    </td></tr>`);
            });
            if (cb) {
                cb();
            }
        });
    }
});