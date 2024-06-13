const IMAGE_EXTENSIONS = ["png", "jpg", "svg", "gif", "jpeg", "jfif", "pjpeg", "pjp", "webp"]

export class Filename {
    private readonly name: string
    private readonly extension: string | null = null

    constructor(name: string) {
        const nameParts = name.split(".")
        this.extension = nameParts.pop() ?? null
        this.name = nameParts.reduce((previousValue, currentValue) => previousValue + "." + currentValue)
    }

    public getExtension(): string | null {
        return this.extension
    }

    public isImageExtension(): boolean {
        if (this.extension === null) {
            return false
        }

        return IMAGE_EXTENSIONS.includes(this.extension)
    }
}
