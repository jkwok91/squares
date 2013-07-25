/*on click i want it to track the place where i clicked, using xcor and ycor. and then split the screen into 4 colors there*/
/*i'll use jquery because i'm lazy*/

/*notes: i ran into this problem earlier and this thread is worth referencing just in case
http://stackoverflow.com/questions/9484295/jquery-click-not-working-for-dynamically-created-items*/


/*start*/
$(document).ready(function () {
    var randomRGB = [Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)];
    console.log(randomRGB);
    $('.stuff').css({
        'background-color': 'rgb('+randomRGB+')',
            'width': '500px',
            'height': '500px'
    });

$('div').on('click','.stuff', function (e) {
    console.log('stuff has been clicked!');
    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;
    var thisRGB = $(this).css('background-color').replace(/[^\d,]/g, '').split(',');
    $('#status').html(x + ', ' + y);
    //how to split up into separate divs
    //make four divs with every click. and erase the big div after colors and everything ahve been set.
    //make upper left div:
    //first need measurements of the bigger div that was just clicked on.
    var totalWidth = $(e.target).width();
    var totalHeight = $(e.target).height();
    var totalArea = totalWidth*totalHeight;
    $('#status2').html(totalWidth + totalHeight);
    //upper left div:
    //this is the easiest one; its height is just y and its width is x
    var ULw = x.toString() + 'px';
    var ULh = y.toString() + 'px';
    var ULselfArea = x*y;
    var ULcol = thisRGB.map(colorMe(ULselfArea)(totalArea));
    $('<div></div>')
        .appendTo($(e.target))
        .addClass('stuff')
        .css({
        'width': ULw,
            'height': ULh,
            'background-color': 'rgb('+ULcol+')',
            'position': 'fixed',
            'top': $(e.target).position().top,
            'left': $(e.target).position().left
    });
    //upper right div:
    var rightWidth = totalWidth - x;
    var URw = rightWidth.toString() + 'px';
    var URh = y.toString() + 'px';
    var URselfArea = rightWidth*y;
    var URcol = thisRGB.map(colorMe(URselfArea)(totalArea));
    $('<div></div>')
        .appendTo($(e.target))
        .addClass('stuff')
        .css({
        'width': URw,
            'height': URh,
            'background-color': 'rgb('+URcol+')',
            'position': 'fixed',
            'top': $(e.target).position().top,
            'left': x+$(e.target).position().left
    });
    //lower left div:
    var bottomHeight = totalHeight - y;
    var LLw = x.toString() + 'px';
    var LLh = bottomHeight.toString() + 'px';
    var LLselfArea = x*bottomHeight;
    var LLcol = thisRGB.map(colorMe(LLselfArea)(totalArea));
    $('<div></div>')
        .appendTo($(e.target))
        .addClass('stuff')
        .css({
        'width': LLw,
            'height': LLh,
            'background-color': 'rgb('+LLcol+')',
            'position': 'fixed',
            'top': y+$(e.target).position().top,
            'left': $(e.target).position().left
    });
    //lower right div:
    var LRw = rightWidth.toString() + 'px';
    var LRh = bottomHeight.toString() + 'px';
    var LRselfArea = rightWidth*bottomHeight;
    var LRcol = thisRGB.map(colorMe(LRselfArea)(totalArea));
    $('<div></div>')
        .appendTo($(e.target))
        .addClass('stuff')
        .css({
        'width': LRw,
            'height': LRh,
            'background-color': 'rgb('+LRcol+')',
            'position': 'fixed',
            'top': y+$(e.target).position().top,
            'left': x+$(e.target).position().left
    });
    //disregard original div
    $(this).removeClass('stuff');
});

});

//calculate the color that it's gonna be (pick random ones for the first set
//otherwise, the algorithm is the small area / total area * color of previously existing square
//make up an algorithm for color!!!!!

function colorMe(selfArea) {
    return function(totalArea) {
        return function(x) {
            var ratio = selfArea / totalArea;
            var go = Math.floor(x*ratio);
            console.log(go);
            if (go%2==0) { return Math.abs((go/2)-256); }
            else { return (2*go)%256};
        };
    };
}
