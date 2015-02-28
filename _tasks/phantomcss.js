/**
 * Phantomas integration for components
 */

module.exports = {
    desktop: {
        options: {
            screenshots: 'test/phantomcss/screenshots/desktop/',
            results: 'test/phantomcss/results/desktop/',
            viewportSize: [1280, 800],
            mismatchTolerance: 0.05
        },
        src: [
            'test/phantomcss/phantomcss.js'
        ]
    },

    tablet: {
        options: {
            screenshots: 'test/phantomcss/screenshots/tablet/',
            results: 'test/phantomcss/results/tablet/',
            viewportSize: [768, 1024],
            mismatchTolerance: 0.05
        },
        src: [
            'test/phantomcss/phantomcss.js'
        ]
    },

    smartphone: {
        options: {
            screenshots: 'test/phantomcss/screenshots/smartphone/',
            results: 'test/phantomcss/results/smartphone/',
            viewportSize: [480, 320],
            mismatchTolerance: 0.05
        },
        src: [
            'test/phantomcss/phantomcss.js'
        ]
    }
};
