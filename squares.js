/*on click i want it to track the place where i clicked, using xcor and ycor. and then split the screen into 4 colors there*/
/*i'll use jquery because i'm lazy*/

/*notes: i ran into this problem earlier and this thread is worth referencing just in case
http://stackoverflow.com/questions/9484295/jquery-click-not-working-for-dynamically-created-items*/


/*start*/
$(document).ready(function () {
    $('.stuff').css({
        'background-color': 'gray',
            'width': '500px',
            'height': '500px'
    });


//calculate the color that it's gonna be (pick random ones for the first set
//otherwise, the algorithm is the small area / total area * color of previously existing square
//make up an algorithm for color!!!!!

$('div').on('click','.stuff', function (e) {
    console.log('stuff has been clicked!');
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    $('#status').html(x + ', ' + y);
    //how to split up into separate divs
    //make four divs with every click. and erase the big div after colors and everything ahve been set.
    //make upper left div:
    //first need measurements of the bigger div that was just clicked on.
    var totalWidth = $(e.target).width();
    var totalHeight = $(e.target).height();
    /*
    $(e.target).css({
        'position':'relative'
    });
    */
    $('#status2').html(totalWidth + totalHeight);
    //upper left div:
    //this is the easiest one; its height is just y and its width is x
    var ULw = x.toString() + 'px';
    var ULh = y.toString() + 'px';
    $('<div></div>')
        .appendTo($(e.target))
        .addClass('stuff')
        .css({
        'width': ULw,
            'height': ULh,
            'background-color': 'red',
            'position': 'fixed',
            'top': $(e.target).position().top,
            'left': $(e.target).position().left
    });
    //upper right div:
    var rightWidth = totalWidth - x;
    var URw = rightWidth.toString() + 'px';
    var URh = y.toString() + 'px';
    $('<div></div>')
        .appendTo($(e.target))
        .addClass('stuff')
        .css({
        'width': URw,
            'height': URh,
            'background-color': 'skyblue',
            'position': 'fixed',
            'top': $(e.target).position().top,
            'left': x+$(e.target).position().left
    });
    //lower left div:
    var bottomHeight = totalHeight - y;
    var LLw = x.toString() + 'px';
    var LLh = bottomHeight.toString() + 'px';
    $('<div></div>')
        .appendTo($(e.target))
        .addClass('stuff')
        .css({
        'width': LLw,
            'height': LLh,
            'background-color': 'teal',
            'position': 'fixed',
            'top': y+$(e.target).position().top,
            'left': $(e.target).position().left
    });
    //lower right div:
    var LRw = rightWidth.toString() + 'px';
    var LRh = bottomHeight.toString() + 'px';
    $('<div></div>')
        .appendTo($(e.target))
        .addClass('stuff')
        .css({
        'width': LRw,
            'height': LRh,
            'background-color': 'lightblue',
            'position': 'fixed',
            'top': y+$(e.target).position().top,
            'left': x+$(e.target).position().left
    });
    //disregard original div
    $(this).removeClass('stuff');
});

});