    const axios = require('axios');
    const cheerio = require('cheerio');

    const url = 'https://barrelhorseworld.com/events.asp';

    axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const eventsTable = $('tbody > tr');
        const events = [];


        eventsTable.each(function () {

          const rowData = $(this).find('td');
          const Info = rowData.text()
          const eventTitle = $(rowData).find('a').text()
          const detailLink = $(rowData).find('a').attr('href')

          events.push({
            title: eventTitle,
            link: detailLink
          });
        });

        console.log(events);
      })
      .catch(console.error);