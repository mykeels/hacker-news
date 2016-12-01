function HackerNews() {
    this.stories = [];
    this.stories.limit = 0;
    var me = this;
    this.getTopStories = function () {
        return fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
                .then(function (storyIds) {
                    return storyIds.json();
                })
                .then(function (storyIds) {
                    console.log(storyIds);
                    me.stories = storyIds.map(function (id) {
                        return { id: id }
                    });
                    me.showNext();
                })
                .catch(function (err, obj) {
                    console.error(err, obj);
                });
    }
    this.getValidStories = function () {
        return me.stories.slice(0, me.stories.limit);
    }
    this.showNext = function () {
        for (var i = limit; i < Math.min(me.stories.length, (limit + 10)); i++) {
            me.getStory(me.stories[i].id);
        }
        limit += 10;
    }
    this.getStory = function (storyId) {
        return fetch("https://hacker-news.firebaseio.com/v0/item/" + storyId + ".json")
                .then(function (story) {
                    return story.json();
                })
                .then(function (story) {
                    console.log(story);
                    var storyObj = me.stories.filter(function (st) {
                        return st.id == storyId;
                    })[0];
                    if (storyObj && story) {
                        for (var key in story) {
                            storyObj[key] = story[key];
                        }
                    }
                })
                .catch(function (err, obj) {
                    console.error(err, obj);
                });
    }
}