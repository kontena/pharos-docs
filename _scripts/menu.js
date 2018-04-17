require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function() {
        $('nav > ul.summary li li').hide();
        $('nav > ul.summary li li.active').parentsUntil('nav').children(':not(script)').show();
        $('nav > ul.summary li.active > ul > li').show();
    });
});