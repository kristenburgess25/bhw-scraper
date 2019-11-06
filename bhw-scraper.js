    const axios = require('axios');
    const cheerio = require('cheerio');

    const url = 'https://barrelhorseworld.com/events.asp';
    const events = []
    const fullData = []

    axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html)
        const eventsTable = $('tbody > tr');
        

        eventsTable.each(function () {
        
          const rowData = $(this).find('td');
          const Info = rowData.text()
          const eventTitle = $(rowData).find('a').text()
          const detailLink = $(rowData).find('a').attr('href')
          const eventDate = $(rowData).first().text()
          const eventLocation = $(rowData).last().text()
        //   const eventDetails = ''
          
     
        
          const detailUrl = `https://barrelhorseworld.com/${detailLink}`

          const event = {
            title: eventTitle,
            date: eventDate,
            location: eventLocation,
            link: detailUrl
          }
          getDetails(event);

        //   console.log(events)
        });
        // getDetails(events[5])
      })
      .catch(console.error);
    
    // function getDetails(event) {
    //     const details = {
    //         description: '',
    //         contact: '',
    //     }

    //     axios(event.link)
    //     .then(response => {
    //         const html = response.data 
    //         const $ = cheerio.load(html)
    //         const detailsTable = $('tbody')

    //         const rightColText = $(detailsTable).find('.text-right').text()
    //         const siblings = $(detailsTable).find('.text-right').siblings().text()

    //         if(rightColText === 'Description') {
    //             console.log('right col sibling', siblings)
    //             details.description = siblings
    //         }

    //         if(rightColText === 'Contact') {
    //             console.log('right col sibling', siblings)
    //             details.contact = siblings
    //         }
    //     })
    // }



    // fetching the details 

    function getDetails(event) {
        // console.log('the event', event)
        axios(event.link)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html)
            const detailsTable = $('tbody > tr')
            const details = {
                description: '',
                contact: '',
            }
  
            detailsTable.each(function() {
                const baseEvent = event 
                // console.log('BASE EVENT CHECK', baseEvent)

  
                const rightColText = $(this).find('.text-right').text()
                const siblings = $(this).find('.text-right').siblings().text()
                // console.log('descriptor', rightColText, 'SIBLINGS', siblings)
  
  
                if(rightColText === 'Description') {
                    // console.log('right col sibling', siblings)
                    details.description = siblings
                }
  
                if(rightColText === 'Contact') {
                    // console.log('right col sibling', siblings)
                    details.contact = siblings
                }
                // console.log('all events', events)
            })
            // console.log('THE EVENT', event)
            // console.log('details', details)
            const mergedData = {...event, ...details}
            // console.log('MERGED DATA', mergedData)
            events.push(mergedData)
        })
        // .catch(console.error);

        // fullData.push({

        // })
    }


    // function updateEvent() {
    //     console.log('ALL EVENTS', events)
    // }


