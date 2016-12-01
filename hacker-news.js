function HackerNews($http) {
    this.stories = [];
    this.limit = 0;
    var me = this;
    this.getTopStories = function () {
        return $http.get("https://hacker-news.firebaseio.com/v0/topstories.json")
                .success(function (storyIds) {
                    console.log(storyIds);
                    me.stories = (storyIds.map(function (id) {
                        return { id: id }
                    }));
                    me.showNext();
                })
                .error(function (err, obj) {
                    console.error(err, obj);
                });
    }
    this.getValidStories = function () {
        return me.stories.slice(0, me.limit);
    }
    this.showNext = function () {
        for (var i = me.limit; i < Math.min(me.stories.length, (me.limit + 10)) ; i++) {
            me.getStory(me.stories[i].id);
        }
        me.limit += 10;
    }
    this.getStory = function (storyId) {
        return $http.get("https://hacker-news.firebaseio.com/v0/item/" + storyId + ".json")
                .success(function (story) {
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
                .error(function (err, obj) {
                    console.error(err, obj);
                });
    }
}