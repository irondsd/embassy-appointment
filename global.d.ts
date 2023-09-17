declare global {
    namespace PlaywrightTest {
        interface Matchers<R> {
            toBeOnPage(): Promise<R>
            toBeWithinRange(a: number, b: number): R
        }
    }
}

export {}
