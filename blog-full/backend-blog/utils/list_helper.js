const dummy = (blogs) => {
    if (blogs) return 1
    return 0
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    const { title, author, likes } = blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
    return { title, author, likes }
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}