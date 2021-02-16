'use strict'


$(document).ready(function () {

    let imgGallary = []

    let main = $('main')
    let filter = $('#filter')
    let keywords = []
    let sortBy = $('#sort')

    let page1 = $('#page1')
    let page2 = $('#page2')
    const page1Link = "data/page-1.json"
    const page2Link = "data/page-2.json"


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
            Gallary.prototype.filterSort(renderAfterFilter)
            itemsHolder = renderAfterFilter
        }
        else {
            Gallary.prototype.filterSort(itemsHolder)
        }

        itemsHolder.forEach(item => {
            let photo = $('#template').html();
            let mustache = Mustache.render(photo, item)
            main.append(mustache);
            if (keywords.includes(item.keyword) == false)
                keywords.push(item.keyword)

        });

        console.log(itemsHolder)

    }

    // Gallary fillters
    Gallary.prototype.addFliters = function (data) {
        filter.append(`<option value='default'selected>default</option>`)
        data.forEach(item => {
            filter.append(`<option value='${item}'>${item}</option>`)
        });
    }

    // Gallary sort
    Gallary.prototype.filterSort = function (sorter) {
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


    // Gallary value change listener
    filter.change(() => {

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


    })

    sortBy.change(() => {

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
    )


    getPageDate(page1Link)
    page1.click(function () {
        main.empty()
        filter.empty()
        imgGallary = []
        keywords = []
        getPageDate(page1Link)


    })
    page2.click(function () {
        main.empty()
        filter.empty()
        imgGallary = []
        keywords = []
        getPageDate(page2Link)

    })



});