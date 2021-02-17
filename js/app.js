'use strict'


$(document).ready(function () {

    let imgGallary = []

    let main = $('main')
    let filter = $('#filter')
    let keywords = []
    let sortBy = $('#sort')

    let page1 = $('#page1')
    let page2 = $('#page2')



    // Load Json data
    function getPageDate(page) {
        $.ajax({
            url: page,
            type: "GET"
        }).then(function (data) {
            data.forEach(item => {
                new Gallary(item.image_url, item.title, item.description, item.keyword, item.horns)
            })
        }).done(() => {
            Gallary.prototype.renderer(imgGallary)
            Gallary.prototype.addFliters(keywords)
        })
    }

    // Gallary constructor
    function Gallary(image_url, title, description, keyword, horns) {
        this.image_url = image_url;
        this.title = title;
        this.description = description;
        this.keyword = keyword;
        this.horns = horns;
        imgGallary.push(this)
    }

    // Gallary items renderer
    Gallary.prototype.renderer = function (renderAfterFilter) {
        let itemsHolder = imgGallary;

        if (renderAfterFilter != "null" || renderAfterFilter != "undefined") {
            itemsHolder = renderAfterFilter
            Gallary.prototype.sorter(renderAfterFilter)
        }
        else {
            Gallary.prototype.sorter(itemsHolder)
        }

        itemsHolder.forEach(item => {
            let photo = $('#template').html();
            let mustache = Mustache.render(photo, item)
            main.append(mustache);
            if (keywords.includes(item.keyword) == false)
                keywords.push(item.keyword)
        });
    }

    // Gallary fillters
    Gallary.prototype.addFliters = function (data) {
        filter.append(`<option value='default'selected>default</option>`)
        data.forEach(item => {
            filter.append(`<option value='${item}'>${item}</option>`)
        });
    }

    // Gallary sort
    Gallary.prototype.sorter = function (sorter) {
        console.log(sortBy.val())
        if (sortBy.val() == "title")
            sorter.sort(function (a, b) {
                if (a.title > b.title) return 1;
                if (a.title < b.title) return -1;
                return 0;
            })
        else if (sortBy.val() == "horns") {
            console.log(sortBy.val())
            sorter.sort(function (a, b) {
                if (a.horns > b.horns) return 1;
                if (a.horns < b.horns) return -1;
                return 0;
            })
        }
    }

    Gallary.prototype.fiterAndSort = function () {

        main.empty();
        if (filter.val() == "default") {
            Gallary.prototype.renderer(imgGallary)
        } else {
            let renderAfterFilter = []
            imgGallary.forEach(item => {
                if (filter.val() == item.keyword) {
                    renderAfterFilter.push(item)
                }
            })
            Gallary.prototype.renderer(renderAfterFilter)
        }
    }

    function pageLoader(page) {
        main.empty()
        filter.empty()
        imgGallary = []
        keywords = []
        getPageDate(page.target.value)
    }


    getPageDate(page1.val())

    page1.click(pageLoader)
    page2.click(pageLoader)
    filter.on('change', Gallary.prototype.fiterAndSort)
    sortBy.on('change', Gallary.prototype.fiterAndSort)
});