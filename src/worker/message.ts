function addEventListener(self: any) {
  self.addEventListener("message", (e: Event) => {
    console.log(e);
  });
}

export { addEventListener };
