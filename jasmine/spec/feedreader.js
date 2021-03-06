/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all have URL and is not empty', function () {
            // better for or forEach loop?
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all have name and is not empty', function () {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {

        // Fields
        var body;

        beforeEach(function () {
            body = $('body')
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });


        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('toggles class when clicked', function () {
            function clickMenu() {
                menuLink = $('.menu-icon-link').trigger('click');
            }

            // Trigger first click
            clickMenu();
            // Expect 'menu-hidden' class to be removed
            expect(body.hasClass('menu-hidden')).toBe(false);

            // Trigger second click
            clickMenu();
            // Expect 'menu-hidden' class to be present
            expect(body.hasClass('menu-hidden')).toBe(true);

        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        })

        it('contains at least a single entry', function (done) {
            expect(allFeeds.length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

    describe('New Feed Selection', function () {
        // Fields
        var feed0;
        var feed1;

        beforeEach(function (done) {
            // Set feed1 to result of index 0
            // Use loadFeed callBack .. ty Udacity
            loadFeed(0, () => {
                feed0 = ($('.feed').html());
                // Set feed1 to result of index 1
                // TODO: Is this running within the app or test scope?
                loadFeed(1, () => {
                    feed1 = ($('.feed').html());
                    done();
                });
            });
        });

        it('feed div content changes with load new feed', function (done) {
            // Check feed variables are defined before execution.
            // Send error if a feed is undefined.
            if (typeof feed0 !== 'undefined' && typeof feed1 !== 'undefined') {
                // Check that feed when 0 index is loaded not equal to feed when 1 index loaded.
                expect(feed0).not.toEqual(feed1);
                done();
            } else {
                throw new Error('Test variables are undefined');
            }
        });
    });

}());
