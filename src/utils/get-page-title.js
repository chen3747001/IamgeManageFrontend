const title = '管理系统'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${title}-${pageTitle}`
    }
    return `${title}`
}